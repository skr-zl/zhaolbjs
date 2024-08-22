/* handlers： 主要为定义 API 逻辑的代码 */
import { rest } from 'msw'
import { nanoid } from 'nanoid' // 设置唯一id

export const touristRoutes = [
  {
    id: nanoid(),
    title: '世纪游轮',
    price: '18150',
    content: '世纪游轮·世纪传奇号15天14晚自由行·世纪游轮2022年江山如此多娇上海—重庆全览长江15日游',
    picUrl: 'https://dimg04.c-ctrip.com/images/300914000000w09uo8773_D_769_510_Q100.jpg',
  },
  {
    id: nanoid(),
    title: '新竹旅游',
    price: '1727',
    content: '德化石牛山景区+翰林陶瓷体验馆+德化陶瓷博物馆+桃仙溪景区桃花岛2日1晚私家团',
    picUrl: 'https://dimg04.c-ctrip.com/images/0303v120008xy5w8hA4C6_D_769_510_Q100.jpg',
  }
]

// 将初始化数据存入 window.localStorage
window.localStorage.getItem('touristRoutes') || window.localStorage.setItem('touristRoutes', JSON.stringify(touristRoutes))

export const handlers = [
  rest.get(`/api/touristRoutes/:id`, (req, res, ctx) => {
    const { id } = req.params
    const touristRoutes = JSON.parse(window.localStorage.getItem('touristRoutes') || '')
    const data = touristRoutes.find((item) => item.id === id)
    if (data) {
      return res(ctx.status(200), ctx.json(data))
    } else {
      return res(ctx.status(500))
    }
  }),
]

export const defaultHandlers = [];

