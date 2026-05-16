import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import pdfWorker from "pdfjs-dist/legacy/build/pdf.worker.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

type PdfCanvasPageProps = {
  url: string;
  pageNumber?: number;
  scale?: number;
  className?: string;
  onDocumentLoad?: (totalPages: number) => void;
  onLoadError?: (error: unknown) => void;
};

export function PdfCanvasPage({
  url,
  pageNumber = 1,
  scale = 1,
  className,
  onDocumentLoad,
  onLoadError,
}: PdfCanvasPageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const onLoadErrorRef = useRef(onLoadError);
  const renderTaskRef = useRef<{ cancel: () => void } | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    onLoadErrorRef.current = onLoadError;
  }, [onLoadError]);

  useEffect(() => {
    let active = true;

    async function renderPage() {
      const canvas = canvasRef.current;
      if (!canvas) {
        console.log("[PdfCanvasPage] canvas indisponivel", {
          pageNumber,
          url,
        });
        return;
      }

      setFailed(false);
      renderTaskRef.current?.cancel();

      try {
        console.log("[PdfCanvasPage] render start", {
          pageNumber,
          scale,
          url,
        });

        const documentTask = pdfjsLib.getDocument(url);
        const document = await documentTask.promise;
        if (!active) {
          console.log("[PdfCanvasPage] documento carregado apos unmount", {
            pageNumber,
            url,
          });
          return;
        }

        onDocumentLoad?.(document.numPages);

        const page = await document.getPage(pageNumber);
        if (!active) {
          console.log("[PdfCanvasPage] pagina carregada apos unmount", {
            pageNumber,
            url,
          });
          return;
        }

        const viewport = page.getViewport({ scale });
        const context = canvas.getContext("2d");
        if (!context) return;

        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = viewport.width * pixelRatio;
        canvas.height = viewport.height * pixelRatio;
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        context.clearRect(0, 0, viewport.width, viewport.height);

        const renderTask = page.render({
          canvas,
          canvasContext: context,
          viewport,
        });

        renderTaskRef.current = renderTask;
        await renderTask.promise;
        console.log("[PdfCanvasPage] render done", {
          pageNumber,
          url,
        });
      } catch (error) {
        const errorName = error instanceof Error ? error.name : "";
        const errorMessage = error instanceof Error ? error.message : String(error);

        console.log("[PdfCanvasPage] render catch", {
          active,
          errorMessage,
          errorName,
          pageNumber,
          url,
        });

        if (active && errorName !== "RenderingCancelledException") {
          onLoadErrorRef.current?.(error);
          setFailed(true);
        }
      }
    }

    renderPage();

    return () => {
      console.log("[PdfCanvasPage] unmount/cancel", {
        pageNumber,
        url,
      });
      active = false;
      renderTaskRef.current?.cancel();
    };
  }, [url, pageNumber, scale, onDocumentLoad]);

  if (failed) {
    return (
      <div className={className}>
        <div className="musician-pdf-fallback">
          Não foi possível carregar a prévia do PDF.
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <canvas ref={canvasRef} className="musician-pdf-canvas" />
    </div>
  );
}
