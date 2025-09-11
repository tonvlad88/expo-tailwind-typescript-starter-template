import React from "react";
import renderer, { act } from "react-test-renderer";
import { Text, View } from "../Themed";
import { useColorScheme as useColorSchemeHook } from "../useColorScheme";

jest.mock("../useColorScheme");
const mockedUseColorScheme = useColorSchemeHook as jest.Mock;

describe("Themed components & hooks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns lightColor when provided and theme is light", () => {
    mockedUseColorScheme.mockReturnValue("light");
    expect(Text({ lightColor: "orange" }).props.style).toBeDefined();
  });

  it("returns darkColor when provided and theme is dark", () => {
    mockedUseColorScheme.mockReturnValue("dark");
    expect(Text({ darkColor: "blue" }).props.style).toBeDefined();
  });

  it("falls back to Colors.light when no prop is provided", () => {
    mockedUseColorScheme.mockReturnValue("light");
    expect(Text({}).props.style).toBeDefined();
  });

  it("falls back to Colors.dark when no prop is provided", () => {
    mockedUseColorScheme.mockReturnValue("dark");
    expect(Text({}).props.style).toBeDefined();
  });

  it("renders Text with provided lightColor", () => {
    mockedUseColorScheme.mockReturnValue("light");
    let tree;
    act(() => {
      tree = renderer.create(<Text lightColor="orange">Hello</Text>);
    });
    expect(tree!.toJSON()).toMatchSnapshot();
  });

  it("renders Text with fallback color", () => {
    mockedUseColorScheme.mockReturnValue("light");
    let tree;
    act(() => {
      tree = renderer.create(<Text>Hello</Text>);
    });
    expect(tree!.toJSON()).toMatchSnapshot();
  });

  it("renders View with provided lightColor", () => {
    mockedUseColorScheme.mockReturnValue("light");
    let tree;
    act(() => {
      tree = renderer.create(<View lightColor="pink" style={{ padding: 5 }} />);
    });
    expect(tree!.toJSON()).toMatchSnapshot();
  });

  it("renders View with fallback backgroundColor", () => {
    mockedUseColorScheme.mockReturnValue("dark");
    let tree;
    act(() => {
      tree = renderer.create(<View />);
    });
    expect(tree!.toJSON()).toMatchSnapshot();
  });

  // ✅ NEW TEST — covers the ?? 'light' fallback branch
  it("renders with 'light' fallback when useColorScheme returns undefined", () => {
    mockedUseColorScheme.mockReturnValue(undefined);
    let tree;
    act(() => {
      tree = renderer.create(<Text>Hello</Text>);
    });
    expect(tree!.toJSON()).toMatchSnapshot();
  });

  it("useColorScheme hook returns light", () => {
    mockedUseColorScheme.mockReturnValue("light");
    expect(mockedUseColorScheme()).toBe("light");
  });

  it("useColorScheme hook returns dark", () => {
    mockedUseColorScheme.mockReturnValue("dark");
    expect(mockedUseColorScheme()).toBe("dark");
  });

  it("useColorScheme hook returns undefined when system is undefined", () => {
    mockedUseColorScheme.mockReturnValue(undefined);
    expect(mockedUseColorScheme()).toBeUndefined();
  });
});
