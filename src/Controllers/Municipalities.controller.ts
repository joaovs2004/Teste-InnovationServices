import { Request, Response } from "express";
import axios from "axios";
import Municipalities from "../Models/Municipalities";

const listMunicipalities = (req: Request, res: Response) => {
    axios("https://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios").then((resp) => {
        res.json(resp.data);

        // After the response from the IBGE api I make a loop adding each municipality to my database
        // If municipalities are already added they are just ignored

        resp.data.forEach((municipalitie: any) => {
            Municipalities.create({
                id: municipalitie.id,
                name: municipalitie.nome
            }).then(() => {
                console.log("Município adicionado");
            }).catch((err) => {
                console.log("Município já adicionado");
            });
        });
    }).catch((err) => {
        res.status(500).json({ msg: "Algo deu errado", error: err });
    });
};

const listMunicipalitieById = (req: Request, res: Response) => {
    Municipalities.findOne({
        where: {
            id: req.params.municipalitieId
        }
    }).then((municipalitie) => {
        if(municipalitie == null) return res.status(404).json(
            "Município não encontrado, cheque se o id está correto ou rode a listagem completa para garantir que o banco de dados já tenha os municípios"
        );

        res.json(municipalitie);
    }).catch((err) => {
        res.status(500).json({ msg: "Algo deu errado", error: err });
    })
};

export { listMunicipalities, listMunicipalitieById };