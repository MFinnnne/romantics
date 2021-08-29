export  default  class KeyWords {
    private static keywords: string[] = [
        "var",
        "if",
        "else",
        "for",
        "while",
        "break",
        "func",
        "return",
    ]


    private static set = new Set(KeyWords.keywords);

    public static isKeyWords(c: string): boolean {
        return KeyWords.set.has(c);
    }
}