class DbConnection{
    private static instance: DbConnection

    private constructor(){}

    public static getInstance(): DbConnection{
        if(!DbConnection.instance){
            DbConnection.instance = new DbConnection()
        }
        return DbConnection.instance;
    }

    //навіщо тут проміс?
    public connect(connector: any, connectionString: string|undefined): Promise<void>{
        return new Promise((resolve, reject)=>{
            connector.connect(connectionString, { useNewUrlParser: true }, (error: any)=>{
                if (!connectionString || error) {
                    return reject(error);
                  }
                console.log("The connected has been successfully established")
                resolve()
            }); 
        }) 
    }
}

export default DbConnection
