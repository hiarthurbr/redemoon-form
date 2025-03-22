// Listas de palavras para gênero masculino
export const adjetivosM: string[] = [
  "rápido",
  "forte",
  "brilhante",
  "bom",
  "feliz",
  "amável",
  "sábio",
  "valente",
  "vivo",
  "novo",
  "audaz",
  "esperto",
  "ágil",
  "decidido",
  "destemido",
  "vigoroso",
];

export const substantivosM: string[] = [
  "tigre",
  "leão",
  "carro",
  "avião",
  "computador",
  "robô",
  "planeta",
  "castelo",
  "cavalo",
  "pássaro",
  "inventor",
  "museu",
  "café",
  "sonho",
  "mar",
  "rio",
];

// Listas de palavras para gênero feminino
export const adjetivosF: string[] = [
  "rápida",
  "forte",
  "brilhante",
  "boa",
  "feliz",
  "amável",
  "sábia",
  "valente",
  "viva",
  "nova",
  "audaz",
  "esperta",
  "ágil",
  "decidida",
  "destemida",
  "vigorosa",
];

export const substantivosF: string[] = [
  "leoa",
  "pantera",
  "casa",
  "máquina",
  "flor",
  "estrela",
  "invenção",
  "cidade",
  "lua",
  "musa",
  "rainha",
  "história",
  "canção",
  "arte",
  "melodia",
  "ideia",
];

// Verbos e advérbios (os verbos não sofrem variação de gênero)
export const verbos: string[] = [
  "correr",
  "voar",
  "brilhar",
  "desbravar",
  "conquistar",
  "explorar",
  "descobrir",
  "transformar",
  "encantar",
  "inspirar",
];

export const adverbios: string[] = [
  "rapidamente",
  "suavemente",
  "elegantemente",
  "destemidamente",
  "vigorosamente",
];

// Função que retorna um elemento aleatório de um array
function random(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Converte um verbo regular do infinitivo para a 3ª pessoa do singular do presente do indicativo.
 *
 * Ex.: "correr" → "corre", "voar" → "voa", "abrir" → "abre".
 */
function conjugate(verb: string): string {
  if (verb.endsWith("ar")) return `${verb.slice(0, -2)}a`;
  if (verb.endsWith("er") || verb.endsWith("ir"))
    return `${verb.slice(0, -2)}e`;

  return verb;
}

/**
 * Interface das opções para customizar o identificador.
 */
export interface Options {
  /**
   * Separador para juntar as partes da frase (padrão: espaço " ").
   */
  separator?: string;
  /**
   * Quantidade de adjetivos (padrão: 1).
   */
  adjetivoCount?: number;
  /**
   * Se deve incluir um advérbio no final (padrão: false).
   */
  addAdverb?: boolean;
  /**
   * Se a frase deve iniciar com letra maiúscula (padrão: true).
   */
  capitalize?: boolean;
  /**
   * Define o artigo a ser usado:
   * - "masculino": sempre usará "O"
   * - "feminino": sempre usará "A"
   * - "aleatorio" (padrão): escolhe aleatoriamente entre "O" e "A"
   */
  article?: "masculino" | "feminino" | "aleatorio";
}

/**
 * Retorna um identificador legível em português como frase completa.
 *
 * O padrão da frase é:
 * "[Artigo] + [adjetivo(s)] + [substantivo] + [verbo conjugado] (+ [advérbio])"
 *
 * A junção dos elementos utiliza o separador definido na opção.
 *
 * @param {Options} [options = {}]
 * @returns {string}
 */
export function identificadorHumano(options: Options = {}): string {
  const {
    separator = "-",
    adjetivoCount = 1,
    addAdverb = false,
    capitalize = true,
    article = "aleatorio",
  } = options;

  // Define o artigo e escolhe as listas de adjetivos e substantivos de acordo com o gênero.
  let art: string;
  let adjsList: string[];
  let subsList: string[];

  if (article === "masculino") {
    art = "o";
    adjsList = adjetivosM;
    subsList = substantivosM;
  } else if (article === "feminino") {
    art = "a";
    adjsList = adjetivosF;
    subsList = substantivosF;
  } else {
    // aleatorio
    if (Math.random() < 0.5) {
      art = "o";
      adjsList = adjetivosM;
      subsList = substantivosM;
    } else {
      art = "a";
      adjsList = adjetivosF;
      subsList = substantivosF;
    }
  }

  // Seleciona os adjetivos
  const adjs: string[] = [];

  for (let i = 0; i < adjetivoCount; i++) {
    adjs.push(random(adjsList));
  }
  const substantivo = random(subsList);
  const verboInf = random(verbos);
  const verboConj = conjugate(verboInf);

  // Monta a frase usando o separador customizado
  const partes = [art, adjs.join(separator), substantivo, verboConj];

  if (addAdverb) {
    partes.push(random(adverbios));
  }
  let frase = partes.join(separator);

  if (capitalize) {
    frase = frase.charAt(0).toUpperCase() + frase.slice(1);
  }

  return frase;
}

/**
 * Retorna o tamanho do pool de identificadores baseado nas opções.
 *
 * Para "aleatorio", o pool é a soma dos pools masculino e feminino.
 *
 * @param {Options} [options = {}]
 * @returns {number}
 */
export function poolSize(options: Options = {}): number {
  const {
    adjetivoCount = 1,
    addAdverb = false,
    article = "aleatorio",
  } = options;

  const poolForGender = (adjsLength: number, subsLength: number) =>
    adjsLength ** adjetivoCount *
    subsLength *
    verbos.length *
    (addAdverb ? adverbios.length : 1);

  if (article === "masculino") {
    return poolForGender(adjetivosM.length, substantivosM.length);
  }
  if (article === "feminino") {
    return poolForGender(adjetivosF.length, substantivosF.length);
  }

  // aleatorio: soma dos dois pools
  return (
    poolForGender(adjetivosM.length, substantivosM.length) +
    poolForGender(adjetivosF.length, substantivosF.length)
  );
}

/**
 * Calcula o comprimento máximo possível para um identificador baseado nas opções.
 *
 * Considera o separador customizável e seleciona o maior comprimento entre masculino e feminino.
 *
 * @param {Options} [options = {}]
 * @returns {number}
 */
export function maxLength(options: Options = {}): number {
  const {
    adjetivoCount = 1,
    addAdverb = false,
    article = "aleatorio",
  } = options;

  // Função auxiliar para calcular o comprimento total de uma combinação
  const totalLength = (
    maxAdjs: number,
    maxSub: number,
    maxVerb: number,
    maxAdv = 0,
  ) =>
    // Comprimento total = soma dos comprimentos + separadores entre cada parte
    maxAdjs * adjetivoCount + // soma dos adjetivos
    adjetivoCount -
    1 + // separadores entre os adjetivos (se houver mais de um)
    maxSub +
    1 +
    maxVerb +
    (addAdverb ? 1 + maxAdv : 0) +
    2; // +2 para o artigo (O/A) e seu espaço

  // Calcula para masculino
  const maxM = totalLength(
    Math.max(...adjetivosM.map((a) => a.length)),
    Math.max(...substantivosM.map((s) => s.length)),
    Math.max(...verbos.map((v) => conjugate(v).length)),
    Math.max(...adverbios.map((a) => a.length)),
  );
  // Calcula para feminino
  const maxF = totalLength(
    Math.max(...adjetivosF.map((a) => a.length)),
    Math.max(...substantivosF.map((s) => s.length)),
    Math.max(...verbos.map((v) => conjugate(v).length)),
    Math.max(...adverbios.map((a) => a.length)),
  );

  if (article === "masculino") return maxM;
  if (article === "feminino") return maxF;

  return Math.max(maxM, maxF);
}

/**
 * Calcula o comprimento mínimo possível para um identificador baseado nas opções.
 *
 * Considera o separador customizável e seleciona o menor comprimento entre masculino e feminino.
 *
 * @param {Options} [options = {}]
 * @returns {number}
 */
export function minLength(options: Options = {}): number {
  const {
    adjetivoCount = 1,
    addAdverb = false,
    article = "aleatorio",
  } = options;

  const totalLength = (
    minAdjs: number,
    minSub: number,
    minVerb: number,
    minAdv = 0,
  ) =>
    minAdjs * adjetivoCount +
    adjetivoCount -
    1 +
    minSub +
    1 +
    minVerb +
    (addAdverb ? 1 + minAdv : 0) +
    2;

  const minM = totalLength(
    Math.min(...adjetivosM.map((a) => a.length)),
    Math.min(...substantivosM.map((s) => s.length)),
    Math.min(...verbos.map((v) => conjugate(v).length)),
    Math.min(...adverbios.map((a) => a.length)),
  );
  const minF = totalLength(
    Math.min(...adjetivosF.map((a) => a.length)),
    Math.min(...substantivosF.map((s) => s.length)),
    Math.min(...verbos.map((v) => conjugate(v).length)),
    Math.min(...adverbios.map((a) => a.length)),
  );

  if (article === "masculino") return minM;
  if (article === "feminino") return minF;

  return Math.min(minM, minF);
}

export default identificadorHumano;
