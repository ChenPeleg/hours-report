import { xlsxFiles } from "./xlsxXmlFilesStructure.js";

/** @param {import("../types/worksheet.types.js").CellStyle[]} allStyles */
export const buildStyleSheets = (allStyles) => {
  const allStylesContainers = {
    background: [],
    color: [],
    font: [],
    bold: [],
    border: [],
  };
  const styleIdModel = {};

  const stylesWithIds = allStyles.map((s) => ({ ...styleIdModel }));
  let styleXml = xlsxFiles.styles.content;

  styleXml = xlsxFiles.styles.content;

  allStyles.forEach((s, i) => {
    for (const prop in s) {
      const trait = s[prop];
      if (!allStylesContainers[prop].includes(trait)) {
        allStylesContainers[prop].push(trait);
      }
      stylesWithIds[i][prop] = allStylesContainers[prop].indexOf(trait);
    }
  });

  const fills = allStylesContainers.background.map((bg) => buildFill(bg));
  if (fills.length) {
    styleXml = styleXml.replace(
      `<fills count="2"><fill><patternFill patternType="none" /></fill><fill><patternFill patternType="lightGray" /></fill>`,
      `<fills count="${
        fills.length + 2
      }" ><fill><patternFill patternType="none" /></fill><fill><patternFill patternType="lightGray" /></fill> 
     ${fills.join("")}`
    );
  }
  let cellXfs = stylesWithIds.map((stl) => {
    // @ts-ignore
    let { background, color, font, bold, border } = stl;
    background = `fillId="${+background + 2}" applyFill="1"`;
    font = !isNaN(font) ? `fontId="${font + 2}" applyFont="1"` : `fontId="0"`;
    border = border
      ? `borderId="${border + 1}" applyBorder="1"`
      : `borderId="0"`;
    return `
    <xf numFmtId="0" ${font} ${background} ${border}  xfId="0" />`;
  });
  if (cellXfs.length) {
    styleXml = styleXml.replace(
      `<cellXfs count="2"><xf/>`,
      `<cellXfs count="${
        cellXfs.length + 1
      }"><xf borderId="0" fillId="0" fontId="0" numFmtId="0" xfId="0">
      </xf> ${cellXfs.join("")}`
    );
  }

  const fonts = allStylesContainers.font.map((f) => buildFont(f));
  if (fonts.length) {
    styleXml = styleXml.replace(
      `<fonts count="2">`,
      `<fonts count="${fonts.length + 2}">`
    );
    styleXml = styleXml.replace(`<font/>`, fonts.join(" "));
  }
  const borders = allStylesContainers.border.map((b) => buildBorder(b));
  if (borders.length) {
    styleXml = styleXml.replace(
      `<borders count="1">
        <border />
    </borders>`,
      `<borders count="${borders.length + 1}">
      <border /> ${borders.join(" ")}
  </borders>`
    );
    styleXml = styleXml.replace(`<font/>`, fonts.join(" "));
  }
  return styleXml;
};

const buildColorAtt = (color) => {
  if (colorMap[color.toLowerCase()]) {
    color = colorMap[color.toLowerCase()];
  }
  return `rgb="FF${color.replace("#", "")}"`;
};
/** @param {import("../types/worksheet.types.js").CellBorder[]} borderObjects */
const buildBorder = (borderObjects) => {
  let fullBorderObjects = borderObjects.map((bo) => {
    /**
     * @type {{
     *   position: "top" | "bottom" | "right" | "left" | "all";
     *   width: "thin" | "medium" | "thick" | "dotted" | "hair" | "double";
     *   color: string;
     * }}
     */
    const border = { color: "000000", position: "all", width: "medium" };
    if (typeof bo === "string") {
      border.position = bo;
    } else {
      border.color = bo.color || border.color;
      border.width = bo.width || border.width;
    }
    return border;
  });
  const allPositionOrder = ["left", "right", "top", "bottom"];
  const sortByPos = (a, b) =>
    allPositionOrder.indexOf(a.position) - allPositionOrder.indexOf(b.position);
  if (fullBorderObjects[0].position === "all") {
    const border = fullBorderObjects[0];
    // @ts-ignore
    fullBorderObjects = allPositionOrder.map((p) => ({
      ...border,
      position: p,
    }));
  } else {
    fullBorderObjects.sort(sortByPos);
  }

  const borderXml = fullBorderObjects.map(
    (bo) => `<${bo.position} style="${bo.width}">
  <color  ${buildColorAtt(bo.color)}  />
</${bo.position}>`
  );

  return `<border>
  ${borderXml.join(" ")} 
</border>`;
};
const buildFill = (color) => {
  const colorAtt = buildColorAtt(color);
  return `<fill><patternFill patternType="solid"><fgColor ${colorAtt} />
  <bgColor ${colorAtt} /></patternFill></fill>`;
};
/**
 * @param {{
 *   size?: number;
 *   bold?: boolean;
 *   color?: string;
 * }} font
 * @returns {string}
 */
const buildFont = (font) => {
  let { size, bold, color } = font;
  const sizeStr = size ? `<sz val="${size}.0" />` : "";
  const colorAtt = color
    ? `<color ${buildColorAtt(color)} />`
    : `<color theme="1" />`;
  return `<font> ${bold ? "<b/>" : ""} 
   ${sizeStr}
   ${colorAtt}
  <name val="Arial" />
  <scheme val="minor" />
</font>`;
};
const colorMap = {
  black: "#000000",
  white: "#FFFFFF",
  red: "#FF0000",
  lime: "#00FF00",
  blue: "#0000FF",
  brown: "#A52A2A",
  yellow: "#FFFF00",
  cyan: "#00FFFF",
  fuchsia: "#FF00FF",
  silver: "#C0C0C0",
  gray: "#808080",
  maroon: "#800000",
  olive: "#808000",
  green: "#008000",
  purple: "#800080",
  teal: "#008080",
  navy: "#000080",
};
