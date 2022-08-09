export default class StringCalculator {
    static numCalled: number = 0;

    static add(numbers: string): number {
        this.numCalled++;

        let delimiter: string | RegExp = RegExp(",|\\n");

        if(numbers.substring(0, 2) == "//"){
            if (numbers.charAt(2) == '[') {
                let matches: string[] = [];
                for (const match of numbers.matchAll(RegExp(/\[(.*?)\]/, "g"))) {
                    matches.push(match[1]);
                };

                delimiter = RegExp(matches.join("|"));
                numbers = numbers.substring(numbers.search("\n"));
            } else {
                delimiter = numbers.charAt(2);
                numbers = numbers.substring(4);
            }
        }

        let split = numbers.split(delimiter);
        let illegalNums: number[] = [];
        let sum = 0;
        for (const num of split) {
            let num_val = Number(num);
            if (num_val > 1000) continue;
            sum += num_val;
            if(num_val < 0){
                illegalNums.push(num_val);
            }
        }

        if (illegalNums.length > 0) {
            throw new Error(`Illegal Nums: ${illegalNums.join(",")}`);
        };

        return sum;
    }
}