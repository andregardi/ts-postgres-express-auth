import { coreApp } from "@core/app";
import { apiRoutes } from "./routes";

coreApp.use('/api', apiRoutes);