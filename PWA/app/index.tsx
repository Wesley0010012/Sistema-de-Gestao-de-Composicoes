import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, BackHandler, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

const configuredUrl = process.env.EXPO_PUBLIC_SCORES_URL?.trim() ?? '';

const webViewHeaders = {
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  Expires: '0',
  'ngrok-skip-browser-warning': 'true',
  Pragma: 'no-cache',
};

const webViewUserAgent = 'ScoresWebView/1.0';

const webViewErrorBridge = `
  (function () {
    function send(type, message) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: type,
        message: String(message || ''),
        url: window.location.href
      }));
    }

    function wrapConsole(method) {
      var original = console[method];

      console[method] = function () {
        var message = Array.prototype.slice.call(arguments).map(function (item) {
          if (typeof item === 'string') {
            return item;
          }

          try {
            return JSON.stringify(item);
          } catch (error) {
            return String(item);
          }
        }).join(' ');

        send('webview-console-' + method, message);
        original && original.apply(console, arguments);
      };
    }

    wrapConsole('log');
    wrapConsole('warn');
    wrapConsole('error');

    send('webview-log', 'bridge instalado');

    function shouldIgnoreError(message) {
      return String(message || '').includes('status code 422');
    }

    function sendError(message) {
      if (shouldIgnoreError(message)) {
        return;
      }

      send('webview-error', message || 'Erro JavaScript na pagina web.');
    }

    window.addEventListener('error', function (event) {
      sendError(event.message);
    });

    window.addEventListener('unhandledrejection', function (event) {
      var reason = event.reason;
      sendError(reason && (reason.message || reason.toString()));
    });

    window.addEventListener('DOMContentLoaded', function () {
      send('webview-log', 'DOMContentLoaded');
    });

    window.addEventListener('load', function () {
      send('webview-log', 'window load');
    });
  })();
  true;
`;

function normalizeScoresUrl(url: string): string | null {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return null;
    }

    return parsedUrl.href.endsWith('/') ? parsedUrl.href : `${parsedUrl.href}/`;
  } catch {
    return null;
  }
}

type NavigationRequest = {
  isTopFrame?: boolean;
  mainDocumentURL?: string;
  url: string;
};

function isInternalWebViewUrl(url: string): boolean {
  if (url === 'about:blank') return true;

  return ['blob:', 'data:', 'file:'].some((protocol) => url.startsWith(protocol));
}

function isScoresPage(url: string, scoresOrigin: string): boolean {
  if (isInternalWebViewUrl(url)) return true;

  try {
    const nextUrl = new URL(url);
    return nextUrl.origin === scoresOrigin && !nextUrl.pathname.startsWith('/admin');
  } catch {
    return false;
  }
}

function isMainScoresUrl(url: string, scoresUrl: string): boolean {
  const normalizedUrl = normalizeScoresUrl(url);

  return normalizedUrl === scoresUrl;
}

export default function ScoresWebView() {
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const scoresUrl = normalizeScoresUrl(configuredUrl);
  const scoresOrigin = scoresUrl ? new URL(scoresUrl).origin : null;
  const cannotOpen = failed || !scoresUrl || !scoresOrigin;

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => true);

    return () => subscription.remove();
  }, []);

  function handleNavigation(request: NavigationRequest) {
    if (!scoresUrl || !scoresOrigin) return false;

    if (request.isTopFrame === false) return true;
    if (isInternalWebViewUrl(request.url)) return true;
    if (isScoresPage(request.url, scoresOrigin)) return true;

    if (request.url.includes('/admin')) {
      webViewRef.current?.stopLoading();
      webViewRef.current?.injectJavaScript(`window.location.href = "${scoresUrl}"; true;`);
    }

    Linking.openURL(request.url).catch(() => undefined);
    return false;
  }

  function reload() {
    console.log('[ScoresWebView] reload solicitado:', scoresUrl);
    setFailed(false);
    setErrorMessage('');
    setLoading(true);
    webViewRef.current?.reload();
  }

  function handleWebMessage(event: WebViewMessageEvent) {
    try {
      const payload = JSON.parse(event.nativeEvent.data) as {
        message?: string;
        type?: string;
        url?: string;
      };

      if (payload.type?.startsWith('webview-console-')) {
        console.log('[ScoresWebView][console]', payload.type.replace('webview-console-', ''), payload.message, payload.url);
        return;
      }

      if (payload.type === 'webview-log') {
        console.log('[ScoresWebView][page]', payload.message, payload.url);
        return;
      }

      if (payload.type === 'webview-error') {
        console.log('[ScoresWebView][page error]', payload.message, payload.url);
      }
    } catch {
      // Ignore messages that are not generated by our error bridge.
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {cannotOpen ? (
        <View style={styles.feedback}>
          <Text style={styles.title}>Não foi possível abrir as partituras</Text>
          <Text style={styles.description}>
            {errorMessage ||
              'Verifique a conexão e confirme se EXPO_PUBLIC_SCORES_URL está configurada com um endereço HTTP ou HTTPS válido.'}
          </Text>
          <TouchableOpacity style={styles.button} onPress={reload}>
            <Text style={styles.buttonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <WebView
            ref={webViewRef}
            source={{ uri: scoresUrl, headers: webViewHeaders }}
            style={styles.webview}
            userAgent={webViewUserAgent}
            originWhitelist={['*']}
            cacheEnabled={false}
            cacheMode="LOAD_NO_CACHE"
            javaScriptEnabled
            domStorageEnabled
            injectedJavaScriptBeforeContentLoaded={webViewErrorBridge}
            allowsBackForwardNavigationGestures={false}
            pullToRefreshEnabled
            setSupportMultipleWindows={false}
            onMessage={handleWebMessage}
            onShouldStartLoadWithRequest={handleNavigation}
            onLoadStart={(event) => {
              console.log('[ScoresWebView] load start:', event.nativeEvent.url);
              setLoading(true);
            }}
            onLoadEnd={(event) => {
              console.log('[ScoresWebView] load end:', event.nativeEvent.url);
              setLoading(false);
            }}
            onError={(event) => {
              setFailed(true);
              setErrorMessage(event.nativeEvent.description);
              setLoading(false);
            }}
            onHttpError={(event) => {
              console.log(
                '[ScoresWebView] http error:',
                event.nativeEvent.statusCode,
                event.nativeEvent.url,
              );

              if (
                scoresUrl &&
                event.nativeEvent.statusCode >= 400 &&
                isMainScoresUrl(event.nativeEvent.url, scoresUrl)
              ) {
                setFailed(true);
                setErrorMessage(`Erro HTTP ${event.nativeEvent.statusCode} ao carregar a aplicação.`);
                setLoading(false);
              }
            }}
          />

          {loading && (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#0d6efd" />
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  webview: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: 'rgba(248, 249, 250, 0.82)',
    justifyContent: 'center',
  },
  feedback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#212529',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    color: '#6c757d',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0d6efd',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});
