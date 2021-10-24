package paser.util;

import lexer.Token;
import paser.ast.ASTNodeTypes;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author MFine
 * @version 1.0
 * @date 2021/9/28 20:40
 **/
public class PriorityTable {

    private List<List<String>>  table = new ArrayList<>();

    public PriorityTable() {
        this.table.add(Arrays.asList("&","|","^"));
        this.table.add(Arrays.asList("==","!=",">","<",">=","<="));
        this.table.add(Arrays.asList("+","-"));
        this.table.add(Arrays.asList("*","/"));
        this.table.add(Arrays.asList("<<",">>"));
    }

    public int size(){
        return  this.table.size();
    }

    public List<String> get(int level){
        return this.table.get(level);
    }


}
