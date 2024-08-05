export const getHoursFromCsv = (csv) => {
  const lines = csv.split("\n");
  let totalHours = 0;
  const dailyHours = [];
  lines.forEach((line) => {
    const cells = line.split(",");
    if (cells[0].trim() === "Total hours") {
      totalHours = parseFloat(cells[2].trim());
    } else if (cells[3] && !isNaN(parseFloat(cells[3].trim()))) {
      const hours = parseFloat(cells[3].trim());
      dailyHours.push(hours);
    }
  });

  return { totalHours, dailyHours };
};
