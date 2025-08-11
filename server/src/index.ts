import server from "./server";

const port = process.env.PORT || 4000

server.listen(4000, () => {
    console.log(`REST en el puerto ${port}`)
})


