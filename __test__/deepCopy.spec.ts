import TokenFactory from "../src/lib/Processes/Parser/tokens/TokenFactory";
import deepCopy from "../src/lib/Utils/DeepClone";


describe("Testing deep copy utility", () => {
    const factory = new TokenFactory();
    const originals = factory.produce();
    const copies = originals.map( obj => deepCopy(obj));

    test("Check property of original and copy object on all tokens", () => {
        originals.forEach((original, index) =>{
            const copy = copies[index];
            for(let key in original){
                if(!original.hasOwnProperty(key)) continue;
                expect(copy).toHaveProperty(key);
            }
            for(let key in copies[index]){
                expect(original).toHaveProperty(key)
            }
        })
    })
});
