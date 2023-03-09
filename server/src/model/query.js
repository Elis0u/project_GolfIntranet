import pool from "../config/database.js";

class Query{

    static async find(query){
        const result = await pool.execute(query);
        return result;
    }

    static async findByValue(query, value){
        const result = await pool.execute(query, [value]);
        return result[0];
    }

    // static async findByValue(query, value){
    //     const result = await pool.execute(query, [value]);
    //     return result[0][0];
    // }

    static async write(query, data){
        const result = await pool.execute(query, [...Object.values(data)]);
        return result;
    }

    static async remove(query, id){
        const result = await pool.execute(query, [id]);
        return result;
    }

}

export default Query