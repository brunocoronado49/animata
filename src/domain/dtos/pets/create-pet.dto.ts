import { Dewormings, Vaccinations } from '../../';

export class CreatePetDto {
  private constructor(
    public readonly owner: string,
    public readonly name: string,
    public readonly specie: string,
    public readonly breed: string,
    public readonly gender: string,
    public readonly is_neutered: boolean,
    public readonly birth_date: Date,
    public readonly color: string,
    public readonly status: boolean,
    public readonly vaccinations: Vaccinations[],
    public readonly dewormings: Dewormings[],
    public readonly photo?: string,
    public readonly micro_chip_id?: string,
  ) {}

  static create(obj: { [key: string]: any }): [string?, CreatePetDto?] {
    const {
      owner,
      name,
      specie,
      breed,
      gender,
      is_neutered,
      birth_date,
      color,
      status,
      vaccinations,
      dewormings,
    } = obj;

    if (!owner) return ['Missing owner'];
    if (!name) return ['Missing name'];
    if (!specie) return ['Missing specie'];
    if (!breed) return ['Missing breed'];
    if (!gender) return ['Missing gender'];
    if (!is_neutered) return ['Missing is neutered'];
    if (!birth_date) return ['Missing birth date'];
    if (!color) return ['Missing color'];
    if (!status) return ['Missing status'];

    if (!Array.isArray(vaccinations))
      return ['Should be an array of vaccination'];

    if (!Array.isArray(dewormings))
      return ['Should be an array of vaccination'];

    return [
      undefined!,
      new CreatePetDto(
        owner,
        name,
        specie,
        breed,
        gender,
        is_neutered,
        birth_date,
        color,
        status,
        vaccinations,
        dewormings,
      ),
    ];
  }
}
