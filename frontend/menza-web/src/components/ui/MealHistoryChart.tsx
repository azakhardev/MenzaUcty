import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import type { MealsHistory } from "../../api/models";

type Props = {
  history?: MealsHistory[];
  height?: number;
};

export default function MealPriceChart({ history = [], height = 180}: Props) {
  const rows = history
    .map(h => {
      return h.price != null ? { x: Date.parse(String(h.date)), y: h.price } : null;
    })
    .filter(Boolean) as { x: number; y: number }[];

  const sorted = rows.slice().sort((a, b) => a.x - b.x);
  const series = [{ name: "Cena", data: sorted }];
  const options: ApexOptions = {
    chart: { id: "meal-prices", toolbar: { show: false }, background: "#fff"},
    xaxis: { type: "datetime", labels: { rotate: -45 } },
    yaxis: { title: { text: "Kč" } },
    stroke: { curve: "straight", width: 2 },
    markers: { size: 3 },
    dataLabels: { enabled: false },
    tooltip: { x: { format: "dd.MM.yyyy" }, y: { formatter: v => `${v},-` } },
    grid: { borderColor: "#eee" },
  };

  if (sorted.length === 0) {
    return <div className="text-sm text-black">Žádná historie cen</div>;
  }

  return <Chart options={options} series={series as any} type="line" height={height}/>;
}