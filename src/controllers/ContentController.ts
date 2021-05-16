export default class ContentController{
    defaultMethod(){
        return {
            text:`You've reached the ${this.constructor.name} default method`
        };
    }
}