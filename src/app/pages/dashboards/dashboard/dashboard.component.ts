import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { ToastService } from "./toast-service";

import { circle, latLng, tileLayer } from "leaflet";
import { SwiperComponent, SwiperDirective } from "ngx-swiper-wrapper";
import { SwiperOptions } from "swiper";

import { BestSelling, TopSelling, RecentSelling, statData } from "./data";
import { ChartType } from "./dashboard.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})

/**
 * app Component
 */
export class DashboardComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  analyticsChart!: ChartType;
  BestSelling: any;
  TopSelling: any;
  RecentSelling: any;
  SalesCategoryChart!: ChartType;
  statData!: any;
  basicBarChart: any;

  @ViewChild(SwiperDirective) directiveRef?: SwiperDirective;
  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;

  constructor(public toastService: ToastService) {}

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: "Dashboards" },
      { label: "Dashboard", active: true },
    ];

    if (localStorage.getItem("toast")) {
      this.toastService.show("Login Was Successfully.", {
        classname: "bg-success text-center text-white",
        delay: 5000,
      });
      localStorage.removeItem("toast");
    }

    /**
     * Fetches the data
     */
    this.fetchData();

    // Chart Color Data Get Function
    this._basicBarChart(
      '["--vz-info", "--vz-info", "--vz-info", "--vz-info", "--vz-danger", "--vz-info", "--vz-info", "--vz-info", "--vz-info", "--vz-info"]'
    );

    this._analyticsChart('["--vz-primary", "--vz-success", "--vz-danger"]');
    this._SalesCategoryChart(
      '["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]'
    );
  }

  // Chart Colors Set
  private getChartColorsArray(colors: any) {
    colors = JSON.parse(colors);
    return colors.map(function (value: any) {
      var newValue = value.replace(" ", "");
      if (newValue.indexOf(",") === -1) {
        var color = getComputedStyle(document.documentElement).getPropertyValue(
          newValue
        );
        if (color) {
          color = color.replace(" ", "");
          return color;
        } else return newValue;
      } else {
        var val = value.split(",");
        if (val.length == 2) {
          var rgbaColor = getComputedStyle(
            document.documentElement
          ).getPropertyValue(val[0]);
          rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
          return rgbaColor;
        } else {
          return newValue;
        }
      }
    });
  }

  /**
   * Sales Analytics Chart
   */
  private _analyticsChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.analyticsChart = {
      chart: {
        height: 370,
        type: "line",
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: "straight",
        dashArray: [0, 0, 8],
        width: [2, 0, 2.2],
      },
      colors: colors,
      series: [
        {
          name: "No. Sale",
          type: "area",
          data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67],
        },
        {
          name: "Earnings",
          type: "bar",
          data: [
            89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57,
            42.36, 88.51, 36.57,
          ],
        },
      ],
      fill: {
        opacity: [0.1, 0.9, 1],
      },
      labels: [
        "01/01/2003",
        "02/01/2003",
        "03/01/2003",
        "04/01/2003",
        "05/01/2003",
        "06/01/2003",
        "07/01/2003",
        "08/01/2003",
        "09/01/2003",
        "10/01/2003",
        "11/01/2003",
      ],
      markers: {
        size: [0, 0, 0],
        strokeWidth: 2,
        hover: {
          size: 4,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      grid: {
        show: true,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        padding: {
          top: 0,
          right: -2,
          bottom: 15,
          left: 10,
        },
      },
      legend: {
        show: true,
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: -5,
        markers: {
          width: 9,
          height: 9,
          radius: 6,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 0,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "30%",
          barHeight: "70%",
        },
      },
    };
  }

  /**
   * Basic Bar Chart & Top Product
   */
  private _basicBarChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.basicBarChart = {
      series: [
        {
          data: [1010, 1640, 490, 1255, 1050, 689, 800, 420, 1085, 589],
          name: "Sessions",
        },
      ],
      chart: {
        type: "bar",
        height: 436,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
          distributed: true,
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetX: 32,
        style: {
          fontSize: "12px",
          fontWeight: 400,
          colors: ["#adb5bd"],
        },
      },
      colors: colors,
      legend: {
        show: false,
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: [
          "Oppo Reno",
          "Iphone 12",
          "Vivo",
          "Huawie",
          "Ipad",
          "Apater",
          "Screen",
          "SamSung",
          
        ],
      },
    };
  }

  /**
   *  Sales Category
   */
  private _SalesCategoryChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.SalesCategoryChart = {
      series: [180, 30, 70],
      labels: ["Sale", "Adjust-deduct", "Adjust-add"],
      chart: {
        type: "donut",
        height: 333,
      },
      plotOptions: {
        pie: {
          offsetX: 0,
          offsetY: 0,
          donut: {
            size: "70%",
            labels: {
              show: false,
            },
          },
        },
      },
      dataLabels: {
        dropShadow: {
          enabled: false,
        },
      },
      legend: {
        position: "bottom",
        // show: false,
      },
      stroke: {
        show: false,
        // lineCap: "round",
        // width: 0
      },
      colors: colors,
    };
  }

  /**
   * Fetches the data
   */
  private fetchData() {
    this.BestSelling = BestSelling;
    this.TopSelling = TopSelling;
    this.RecentSelling = RecentSelling;
    this.statData = statData;
  }

  /**
   * Swiper Vertical
   */
  public Vertical: SwiperOptions = {
    a11y: { enabled: true },
    direction: "vertical",
    slidesPerView: 2,
    pagination: true,
  };

  /**
   * Recent Activity
   */
  toggleActivity() {
    const recentActivity = document.querySelector(".layout-rightside-col");
    if (recentActivity != null) {
      recentActivity.classList.toggle("d-none");
    }

    if (window.screen.width <= 767) {
      const recentActivity = document.querySelector(".layout-rightside-col");
      if (recentActivity != null) {
        recentActivity.classList.add("d-block");
        recentActivity.classList.remove("d-none");
      }
    }
  }

  /**
   * SidebarHide modal
   * @param content modal content
   */
  SidebarHide() {
    const recentActivity = document.querySelector(".layout-rightside-col");
    if (recentActivity != null) {
      recentActivity.classList.remove("d-block");
    }
  }
}
