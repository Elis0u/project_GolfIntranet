import { success } from "../helpers/index.js";
import Query from "../model/query.js";

export const lastActivities = async (req, res) => {
    try {
        const query = "SELECT 'document' as type, id, title, createdAt FROM document UNION ALL SELECT 'event' as type, id, title, createdAt FROM event ORDER BY createdAt DESC LIMIT 5";
        const [activities] = await Query.find(query);
        if(activities.length){
            const msg = "Recovery of five last activities";
            res.status(200).json(success(msg, activities));
        } else {
            const msg = "No yet last activity in database";
            res.status(200).json(success(msg));
        }
    } catch (err) {
        throw Error(err);
    }
}