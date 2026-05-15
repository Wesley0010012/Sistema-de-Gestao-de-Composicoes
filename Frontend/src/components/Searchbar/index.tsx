import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

type SearchBarProps = {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function SearchBar({ label, onChange }: SearchBarProps) {
  return (
    <InputGroup>
      <InputGroup.Text>
        <Search />
      </InputGroup.Text>
      <Form.Control placeholder={label} onChange={onChange} />
    </InputGroup>
  );
}
