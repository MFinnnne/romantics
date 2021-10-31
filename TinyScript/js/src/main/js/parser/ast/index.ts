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

module.exports = {
    get AssignStmt(): Required<AssignStmt> {
        return require("./AssignStmt")
    },

    get Stmt(): Required<Stmt> {
        return require("./Stmt")
    },

    get DeclareStmt(): Required<DeclareStmt> {
        return require("./DeclareStmt")
    },

    get IfStmt(): Required<IfStmt> {
        return require("./IfStmt")
    },

    get Expr(): Required<Expr> {
        return require("./Expr")
    }
    ,

    get Factor(): Required<Factor> {
        return require("./Factor")
    },

    get FotStmt(): Required<ForStmt> {
        return require("./ForStmt")
    },

    get FunctionDefineStmt(): Required<FunctionDefineStmt> {
        return require("./FunctionDefineStmt")
    },

    get Scalar(): Required<Scalar> {
        return require("./Scalar")
    },

    get Variable(): Required<Variable> {
        return require("./Variable")
    }
}