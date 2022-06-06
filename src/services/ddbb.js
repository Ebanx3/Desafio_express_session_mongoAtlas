import mongoose from "mongoose";
import config from "../config";

export const ConnectToDDBB = () => {
    return mongoose.connect(config.URL_MONGOATLAS,{});
};