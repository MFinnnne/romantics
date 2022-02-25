import AssignStmt from "./AssignStmt";
import Stmt from "./Stmt";
import DeclareStmt from "./DeclareStmt";
import IfStmt from "./IfStmt";
import Expr from "./Expr";
import Factor from "./Factor";
import ForStmt from "./ForStmt";
import FunctionDefineStmt from "./FunctionDefineStmt";
import Scalar from "./Scalar";
import Variable from "./Variable";
import Block from "./Block";

module.exports = {
    get AssignStmt(): AssignStmt {
        return require("./AssignStmt").default;
    },

    get Stmt(): Stmt {
        return require("./Stmt").default;
    },

    get DeclareStmt(): DeclareStmt {
        return require("./DeclareStmt").default;
    },

    get IfStmt(): IfStmt {
        return require("./IfStmt").default;
    },

    get Expr(): Expr {
        return require("./Expr").default;
    },

    get Factor(): Factor {
        return require("./Factor").default;
    },

    get FotStmt(): ForStmt {
        return require("./ForStmt").default;
    },

    get FunctionDefineStmt(): FunctionDefineStmt {
        return require("./FunctionDefineStmt").default;
    },

    get Scalar(): Scalar {
        return require("./Scalar").default;
    },

    get Variable(): Variable {
        return require("./Variable").default;
    },

    get Block(): Block {
        return require("./Block").default;
    }
}