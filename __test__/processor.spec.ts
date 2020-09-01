import {IProcess, Processor} from "../src/lib";
import {data} from "../src/lib/Processor/Processor";

function generateProcesses() {
    const processA = <IProcess>{
        id: "processA",
        run: jest.fn(input => (<string>input).toLowerCase())
    }
    const processB = <IProcess>{
        id: "processB",
        run: jest.fn(input => <string>input + <string>input)
    }
    const processC = <IProcess>{
        id: "processC",
        run: jest.fn(input => (<string>input).split("").reverse().join(""))
    }
    return {processA, processB, processC};
}

describe("Processor", () => {
    test("has methods", () => {
        const processor = new Processor();
        const methods = [
            "use",
            "extend",
            "exclude",
            "compute"
        ]
        for(let method of methods){
            expect(processor).toHaveProperty(method)
        }
    })

    test("mocky processes race", () => {
        const processor = new Processor();
        const {processA, processB, processC} = generateProcesses();
        processor.use(processA).use(processB).use(processC);

        const output = <string>processor.compute("TeSt");
        expect(output.length).toEqual("testtest".length);
        expect(output).toEqual("testtest".split("").reverse().join(""))
    })

   test("extend process", () => {
       const processor = new Processor();
       const {processA, processB, processC} = generateProcesses();
       processor.use(processA).use(processB).use(processC);

       const output = <string>processor.compute("abc");
       expect(output).toEqual("cbacba");

       processor.extend("processB", (process: IProcess) => {
           return <IProcess>{
               get id(){return process.id},
               run(input:data){
                   let output =  process.run(input);
                   output = <string>output + <string>output;
                   return output;
               }
           }
           return process;
       })

      const output2 = <string>processor.compute("ab");
      expect(output2).toEqual("babababa");
   })

})