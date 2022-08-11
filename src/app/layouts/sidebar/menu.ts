import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  {
    id: 2,
    label: 'MENUITEMS.DASHBOARD.TEXT',
    icon: 'ri-dashboard-2-line',
    link: '',
    subItems: [ ]
  },
  {
    id: 3,
    label: 'MENUITEMS.HOME.TEXT',
    icon: 'ri-apps-2-line',
    link: '',
    subItems: [
          {
            id: 13,
            label: 'MENUITEMS.HOME.LIST.PRODUCTS',
            link: '/home/products',
            parentId: 12
          },
          {
            id: 14,
            label: 'MENUITEMS.HOME.LIST.PRODUCTDETAILS',
            link: '/home/product-detail/1',
            parentId: 12
          },
          {
            id: 17,
            label: 'MENUITEMS.HOME.LIST.ORDERDETAILS',
            link: '/home/order-details',
            parentId: 12
          },
          {
            id: 19,
            label: 'MENUITEMS.HOME.LIST.CONFIRMORDER',
            link: '/home/confirm',
            parentId: 12
          },
        ]
  },
  {
    id: 4,
    label:'MENUITEMS.STOCK.TEXT',
    icon: 'bx bxs-cart-add',
    subItems: [
      {
        id: 35,
        label: 'MENUITEMS.STOCK.LIST.LISTSTOCKS',
        link: '/stocks/list',
        parentId: 31
      },
      {
        id: 15,
        label: 'MENUITEMS.STOCK.LIST.ADDSTOCK',
        link: '/stocks/add-product',
        parentId: 12
      },
      {
        id: 48,
        label: 'MENUITEMS.STOCK.LIST.STOCKADJUSTMENT',
        link: '/stocks/adjust',
        parentId: 46
      },
    ]
  },
  {
    id: 5,
    label:'MENUITEMS.EMPLOYEE.TEXT',
    icon: 'bx bxs-user-badge',
    link: '/employees/employee',
  },

  {
    id: 8,
    label: 'MENUITEMS.REPORT.TEXT',
    icon: 'bx bxs-report',
    subItems: [
      {
        id: 46,
        label: 'MENUITEMS.REPORT.LIST.TRANSAC',
        parentId: 8,
        link: '/reports/transac',
      },
      {
        id: 42,
        label: 'MENUITEMS.REPORT.LIST.INVOICE',
        parentId: 8,
        subItems: [
          {
            id: 43,
            label: 'MENUITEMS.HOME.LIST.LISTVIEW',
            link: '/invoices/list',
            parentId: 42
          },
          {
            id: 44,
            label: 'MENUITEMS.HOME.LIST.DETAILS',
            link: '/invoices/details',
            parentId: 42
          },
          {
            id: 45,
            label: 'MENUITEMS.HOME.LIST.CREATEINVOICE',
            link: '/invoices/create',
            parentId: 42
          }
        ]
      },
    ]
  },

]
