export class Cargo {
  codigo?: number;
  nome!: string;
}

export class Perfil {
  codigo?: number;
  nome!: string;
}

export class Usuario {
  codigo?: number;
  nome!: string;
  cpf!: string;
  dataNascimento?: Date;
  sexo?: Sexo;
  cargo = new Cargo();
  perfis = new Array<Perfil>();
}

export enum Sexo {
  M, F
}
