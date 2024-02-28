import React from "react";
import { Badge } from "../ui/badge";

export default function BadgeContainer({ handleTagFilter }) {
  return (
    <>
      <Badge
        onClick={() => {
          handleTagFilter("Machine Learning");
        }}
        variant="secondary"
      >
        Machine Learning
      </Badge>
      <Badge
        onClick={() => {
          handleTagFilter("Artifical Intelligance");
        }}
        variant="secondary"
      >
        Artifical Intelligance{" "}
      </Badge>
      <Badge
        onClick={() => {
          handleTagFilter("Physics");
        }}
        variant="secondary"
      >
        Physics{" "}
      </Badge>
      <Badge
        onClick={() => {
          handleTagFilter("Chemistry");
        }}
        variant="secondary"
      >
        Chemistry
      </Badge>
      <Badge
        onClick={() => {
          handleTagFilter("Biology");
        }}
        variant="secondary"
      >
        Biology
      </Badge>
      <Badge
        onClick={() => {
          handleTagFilter("Mathematics");
        }}
        variant="secondary"
      >
        Mathematics
      </Badge>
      <Badge
        onClick={() => {
          handleTagFilter("Finance");
        }}
        variant="secondary"
      >
        Finance
      </Badge>
      <Badge
        onClick={() => {
          handleTagFilter("Data");
        }}
        variant="secondary"
      >
        Data Science
      </Badge>
      <Badge
        onClick={() => {
          handleTagFilter("Agricultural");
        }}
        variant="secondary"
      >
        Agricultural
      </Badge>
    </>
  );
}
