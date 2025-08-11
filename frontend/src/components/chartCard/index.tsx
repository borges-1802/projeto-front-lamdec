import styled from "styled-components";
import { ReactNode } from "react";
import { Card } from "./styles";

interface Props {
  title: string;
  children: ReactNode;
}

export default function ChartCard({ title, children }: Props) {
  return (
    <Card>
      <h3>{title}</h3>
      {children}
    </Card>
  );
}
