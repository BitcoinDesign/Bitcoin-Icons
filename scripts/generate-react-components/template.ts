export const template = (
  { template }: any,
  opts: any,
  { imports, componentName, props, jsx, exports }: any
) => {
  const tsTemplate = template.smart({ plugins: ["typescript"] });

  return tsTemplate.ast`
      import * as React from "react";
      import Svg, { Path, SvgProps } from "react-native-svg";

      interface Props extends SvgProps {
        size?: number;
      }

      const ${componentName} = ({ size = 24, ...props }: Props) => {
        return (
          ${jsx}
        )
      };

      ${exports}
    `;
};

export default template;
