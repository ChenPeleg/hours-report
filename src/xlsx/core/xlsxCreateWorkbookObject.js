import { buildSheetXml } from "./xlsxSheetBuilder.js";
import { xlsContentBuilder } from "./xlsxContentBuilder.js";
import { xlsxFiles } from "./xlsxXmlFilesStructure.js";
import { buildStyleSheets } from "./xlsxStyleBuilder.js";

/** @param {import("../types/worksheet.types.js").Workbook} workbook */
export const createFileObjectFromSheets = (workbook) => {
  let { sheets } = workbook;
  sheets = sheets.map((s) => ({
    ...s,
    rows: s.rows.map((r) => ({ ...r, cells: r.cells.map((c) => ({ ...c })) })),
  }));
  const xmlFilesObject = {
    ...xlsxFiles,
    workbookXml: { ...xlsxFiles.workbookXml },
    workbookRels: { ...xlsxFiles.workbookRels },
    styles: { ...xlsxFiles.styles },
  };
  const allStyles = [];

  sheets.forEach((s) =>
    s.rows.forEach((r) =>
      r.cells.forEach((c) => {
        const styleProps = Object.keys(c.style);
        if (styleProps.length) {
          const stringifiedStyle = JSON.stringify(c.style);
          if (!allStyles.includes(stringifiedStyle)) {
            allStyles.push(stringifiedStyle);
          }
          c.style = { ...c.style };
          c.style.styleId = allStyles.indexOf(stringifiedStyle).toString();
        }
      })
    )
  );
  const styles = buildStyleSheets(allStyles.map((s) => JSON.parse(s)));
  xmlFilesObject.styles.content = styles;

  const sheetNames = sheets.map((s) => s.name);
  xmlFilesObject.workbookXml.content =
    xlsContentBuilder.buildWorkbookXml(sheetNames);
  xmlFilesObject.workbookRels.content =
    xlsContentBuilder.buildRelationsXml(sheetNames);
  const genericSheet = {
    ...xmlFilesObject.sheet1,
    url: [...xmlFilesObject.sheet1.url],
  };
  sheets.forEach((sheet, index) => {
    const sheetIndex = `sheet${index + 1}`;
    const sheetAsString = buildSheetXml(sheet);
    xmlFilesObject[sheetIndex] = {};
    xmlFilesObject[sheetIndex].url = [
      ...genericSheet.url.slice(0, -1),
      `${sheetIndex}.xml`,
    ];

    xmlFilesObject[sheetIndex].content = genericSheet.content.replace(
      "<sheetData/>",
      sheetAsString
    );
  });
  return xmlFilesObject;
};
