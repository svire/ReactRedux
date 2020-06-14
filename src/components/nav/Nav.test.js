import React from "react";
import Navigation from "./Navigation";
import {mount, shallow} from "enzyme";

it("containts 3 NavLinks via Shllow", () => {
  const numLinks = shallow(<Navigation />).find("NavLink").length;
  expect(numLinks).toEqual(3);
});
