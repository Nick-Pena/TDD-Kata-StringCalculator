import { assert } from "chai";
import { describe, it } from "mocha";
import StringCalculator from "../src/StringCalculator";

describe("StringCalculator", () => {
    describe("#add()", () => {
        it("should return 0 if empty string", () => {
            assert.equal(StringCalculator.add(""), 0);
        });

        it("should return 1 with '1'", () => {
            assert.equal(StringCalculator.add("1"), 1);
        });

        it("should return 3 with '1,2'", () => {
            assert.equal(StringCalculator.add("1,2"), 3);
        });

        it("should return 6 with '1,2,3'", () => {
            assert.equal(StringCalculator.add("1,2,3"), 6);
        });

        it("should return 6 with newline and comma '1\n2,3'", () => {
            assert.equal(StringCalculator.add("1\n2,3"), 6);
        });

        it("should return 3 when a default delimiter is provided '//;\n1;2'", () => {
            assert.equal(StringCalculator.add("//;\n1;2"), 3);
        });

        it("should return 6 when a default delimiter is provided '//.\n1.2.3'", () => {
            assert.equal(StringCalculator.add("//.\n1.2.3"), 6);
        });

        it("should return exception if negative number was passed '1,-2,1'", () => {
            assert.throw(() => StringCalculator.add("1,-2,1"), Error, "Illegal Nums: -2");
        });

        it("should return exception if negative number was passed '1,-2,-3,1'", () => {
            assert.throw(() => StringCalculator.add("1,-2,-3,1"), Error, "Illegal Nums: -2,-3");
        });

        it("should return 9 times called", () => {
            assert.equal(StringCalculator.numCalled, 9);
        });

        it("should ignore numbers > 1000 '2, 1001'", () => {
            assert.equal(StringCalculator.add("2,1001"), 2);
        });

        it("should work with delimeter of any length '//[aa]\n2aa3'", () => {
            assert.equal(StringCalculator.add("//[aa]\n2aa3"), 5);
        }); 

        it("should work with multiple delimeters of any length '//[aa][bb]\n2aa3bb4'", () => {
            assert.equal(StringCalculator.add("//[aa][bb]\n2aa3bb4"), 9);
        }); 

        it("should work with multiple delimiters of length 1", () => {
            assert.equal(StringCalculator.add("//[a][b]\n2a3b4"), 9);
        });
    });
});