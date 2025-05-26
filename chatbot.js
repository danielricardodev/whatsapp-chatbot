const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

let qrCodeImage = '';

client.on('qr', (qr) => {
  console.log('QR RECEBIDO, gerando imagem...');
  qrcode.toDataURL(qr, (err, url) => {
    if (err) {
      console.error('Erro ao gerar imagem do QR Code:', err);
      return;
    }
    qrCodeImage = url;
  });
});

app.get('/qr', (req, res) => {
  if (qrCodeImage) {
    res.send(`<img src="${qrCodeImage}" style="width:300px; height:300px;">`);
  } else {
    res.send('QR Code não gerado ainda ou já autenticado.');
  }
});

const port = process.env.PORT || 8080;
app.listen('0.0.0.0', port, () => {
  console.log(`Servidor rodando em http://0.0.0.0:${port}/qr`);
});

client.initialize();


const delay = ms => new Promise(res => setTimeout(res, ms));

// Funil

client.on('message', async msg => {
    const chat = await msg.getChat();
    const contact = await msg.getContact();
    const name = contact.pushname?.split(" ")[0] || "oi";

    // Saudação inicial com palavras-chave
    if (msg.body.match(/(menu|dia|tarde|noite|oi|olá|ola)/i) && msg.from.endsWith('@c.us')) {
        await delay(2000);
        await chat.sendStateTyping();
        await delay(3000);

        await client.sendMessage(msg.from, 
`Oi, ${name}! 👋 Tudo bem?

Seja bem-vindo(a) à *By Ester Lilian*! Trabalhamos com bolsas femininas direto da fábrica, no atacado.

Como posso te ajudar hoje?

Escolha uma opção:
1️⃣ - Como funciona a compra  
2️⃣ - Formas de pagamento  
3️⃣ - Benefícios  
4️⃣ - Como fazer o pedido  
5️⃣ - Outras dúvidas`);
        return;
    }

    // Respostas do menu
    if (msg.body === '1') {
        await delay(2000);
        await chat.sendStateTyping();
        await delay(3000);

        await client.sendMessage(msg.from, 
`Trabalhamos com bolsas femininas no *atacado*, direto da fábrica. 👛

Nosso catálogo está disponível em PDF ou pelo site.

📦 Enviamos via *excursões* (rodoviária) ou *Correios*. 
💬 O atendimento é feito por aqui mesmo.`);

        await delay(2000);
        await chat.sendStateTyping();
        await delay(3000);

        await client.sendMessage(msg.from, 
`📄 Catálogo PDF:  
https://drive.google.com/file/d/1D_-5xmpiqfhxkfvx-UscZmSFfiYq4yVG/view?usp=drivesdk

🛍️ Site:  
https://byesterlilian.lojavirtualnuvem.com.br`);
    }

    if (msg.body === '2') {
        await delay(2000);
        await chat.sendStateTyping();
        await delay(3000);

        await client.sendMessage(msg.from, 
`💰 Formas de pagamento:

✔️ *WhatsApp*: Pagamento via *Pix*.  
✔️ *Site*: Aceitamos *Pix* e *cartão de crédito*.

Se quiser pagar com cartão, podemos te ajudar adicionando os modelos no site.`);
    }

    if (msg.body === '3') {
        await delay(2000);
        await chat.sendStateTyping();
        await delay(3000);

        await client.sendMessage(msg.from, 
`🌟 Por que comprar com a *By Ester Lilian*?

✅ Somos fabricantes  
✅ Qualidade e preço direto da fábrica  
✅ Modelos atualizados com as tendências  
✅ Atendimento personalizado  
✅ Suporte no pós-venda`);
    }

    if (msg.body === '4') {
        await delay(2000);
        await chat.sendStateTyping();
        await delay(3000);

        await client.sendMessage(msg.from, 
`📝 Como fazer o pedido:

1️⃣ Veja os modelos no catálogo ou site  
2️⃣ Escolha as cores e quantidades  
3️⃣ Envie aqui no WhatsApp  
4️⃣ Passamos os dados para pagamento  
5️⃣ Após confirmação, despachamos via Correios ou excursão`);
    }

    if (msg.body === '5') {
        await delay(2000);
        await chat.sendStateTyping();
        await delay(3000);

        await client.sendMessage(msg.from, 
`🤔 Outras dúvidas? Pode perguntar por aqui mesmo!

📄 Catálogo PDF:  
https://drive.google.com/file/d/1D_-5xmpiqfhxkfvx-UscZmSFfiYq4yVG/view?usp=drivesdk

🛍️ Site:  
https://byesterlilian.lojavirtualnuvem.com.br`);
    }

    // Catálogo fora do menu
    if (msg.body.match(/(catálogo|catalogo)/i)) {
        await delay(2000);
        await chat.sendStateTyping();
        await delay(3000);

        await client.sendMessage(msg.from, 
`📄 Aqui está nosso catálogo atualizado:

PDF:  
https://drive.google.com/file/d/1D_-5xmpiqfhxkfvx-UscZmSFfiYq4yVG/view?usp=drivesdk

🛍️ Ou, se preferir, acesse nosso site:  
https://byesterlilian.lojavirtualnuvem.com.br`);
    }

    // Localização / Loja Física
    if (msg.body.match(/(onde fica|localização|loja física|tem loja|vocês ficam onde|endereço|localizados)/i)) {
        await delay(2000);
        await chat.sendStateTyping();
        await delay(3000);

        await client.sendMessage(msg.from, 
`📍 Atendemos exclusivamente online, por WhatsApp e pelo nosso site.

🏭 Nossa fábrica fica em *Fortaleza - CE*, mas não temos loja física aberta ao público.

Se quiser, posso te enviar o catálogo agora mesmo. 😉`);
    }
});
