import React from "react";
import renderer from "react-test-renderer";
import SelectMode from "../SelectMode";

it("SelectMode should render correctly", () => {
  const tree = renderer.create(<SelectMode />).toJSON();
  expect(tree).toMatchSnapshot();
});