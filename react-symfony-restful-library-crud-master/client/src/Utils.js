class Utils {
    static buildGetUrl(path, parameters, url = process.env.REACT_APP_API_URL){
        if(url[url.length-1] === '/'){
            url = url.slice(0, -1)
        }

        if(path[0] !== '/'){
            path = '/' + path;
        }

        url += path

        if(parameters){
            url += '?'

            const paramKeys = Object.keys(parameters);

            paramKeys.forEach(paramKey => {

                const param = parameters[paramKey];

                if(Array.isArray(param)){
                    param.forEach(element => {
                        url += `${paramKey}[]=${encodeURIComponent(element)}&`
                    });
                    return;
                }

                url += `${paramKey}=${encodeURIComponent(param)}&`;

            });
    
            url = url.slice(0, -1);
        }
        
        return url;
        
    }

}

export default Utils;