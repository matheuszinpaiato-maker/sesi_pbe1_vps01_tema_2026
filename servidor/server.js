const express = require("express")
const registros = require("../dados.json");

function autoIncrement() {
    return Number(registros[registros.length - 1].id) + 1
}

const rotaInicial = (req, res) => {
    res.json("Back-end respondendo")
}

const novoRegistro = (req, res) => {
    const registro = req.body
    registro.id = autoIncrement()
    registros.push(registro)
    res.status(201).json(registro)
}

const mostrarRegistro = (req, res) => {
    res.send(registros)
}

const alterarRegistro = (req, res) => {
    const id = req.params.id
    const dados = req.body
    dados.id = Number(id)
    let status = 0

    registros.forEach((registro, indice) => {
        if (registro.id == id) {
            registros[indice] = dados
            status = 1
        }
    })

    if (status == 1) {
        res.status(202).json(dados)
    } else {
        res.status(404).send("Registro não encontrado")
    }
}

const excluirRegistro = (req, res) => {
    const id = req.params.id
    let status = 0

    registros.forEach((registro, indice) => {
        if (registro.id == id) {
            registros.splice(indice, 1)
            status = 1
        }
    })

    if (status == 1) {
        res.json("Registro excluido com sucesso")
    } else {
        res.status(404).send("Registro não encontrado")
    }
}

const buscaRegistro = (req, res) => {
    const id = req.params.id
    const registro = registros.find((p) => p.id == id)

    if(registro) {
        return res.send(registro)
    }
    res.status(404).send("Registro não encontrada")
}

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const porta = 3000

app.get('/', rotaInicial)
app.post("/registros", novoRegistro);
app.get("/registros", mostrarRegistro);
app.put("/registros/:id", alterarRegistro);
app.delete("/registros/:id", excluirRegistro);
app.get("/registro/:id", buscaRegistro);

app.listen(porta, () => {
    console.log(`Servidor: http://localhost:${porta}`)
})  