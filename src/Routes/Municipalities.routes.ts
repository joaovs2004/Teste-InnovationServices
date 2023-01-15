import { Router } from "express";
import { listMunicipalitieById, listMunicipalities } from "../Controllers/Municipalities.controller";

const municipalitiesRouter = Router();

municipalitiesRouter.get("/list", listMunicipalities);
municipalitiesRouter.get("/listById/:municipalitieId", listMunicipalitieById);

export default municipalitiesRouter;