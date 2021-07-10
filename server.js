const express = require('express')
const puppeteer = require('puppeteer')

const server = express()

server.get('/', async (req, res) => {
  const url = 'https://www.wuxiaworld.co/My-Vampire-System/5064886.html'
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setDefaultNavigationTimeout(0) 
  await page.goto(url, {
    waitUntil: 'load'
  })

  const response = await page.evaluate(() => {
  
    let title = document.querySelector('.chapter-title').innerText // Remove todas as tags e deixa o texto
    title = title.split(' ') // As 3 linhas separam o título e número do capítulo
    let number = Number(title.shift())
    title = title.join(' ')

    let chapter = document.querySelector('.chapter-entity').innerText.split('\n\n') // Separa os parágrafos
    chapter = chapter.filter(el => el.trim().length > 0) // Remove itens vazios

    return {
      number,
      title,
      chapter,
      length: chapter.length
    }
  })

  await browser.close()

  res.json(response)
})

const port = 3000
server.listen(port, () => {
  console.log(`
    Servidor rodando.
    Acesse em http://localhost:${port}
  `)
})