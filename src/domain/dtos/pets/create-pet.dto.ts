import { Dewormings, Vaccinations } from '../../';

export class CreatePetDto {
  private constructor(
    public readonly owner: string,
    public readonly name: string,
    public readonly specie: string,
    public readonly breed: string,
    public readonly gender: string,
    public readonly isNeutered: boolean,
    public readonly birthDate: Date,
    public readonly color: string,
    public readonly status: boolean,
    public readonly vaccinations: Vaccinations[],
    public readonly dewormings: Dewormings[],
    public readonly photo?: string,
    public readonly micro_chip_id?: string,
  ) {}

  static create(obj: { [key: string]: any }): [string?, CreatePetDto?] {
    if (!obj) return ['Missing payload'];

    const {
      owner,
      name,
      specie,
      breed,
      gender,
      isNeutered,
      birthDate,
      color,
      status,
      vaccinations,
      dewormings = [],
      photo,
      micro_chip_id,
    } = obj;

    if (!owner) return ['Missing owner'];
    if (!name) return ['Missing name'];
    if (!specie) return ['Missing specie'];
    if (!breed) return ['Missing breed'];
    if (!gender) return ['Missing gender'];

    if (isNeutered === undefined || isNeutered === null) {
      return ['Missing is neutered'];
    }

    if (!birthDate) return ['Missing birth date'];
    if (!color) return ['Missing color'];

    if (status === undefined || status === null) {
      return ['Missing status'];
    }

    if (!Array.isArray(vaccinations)) {
      return ['Vaccinations must be an array'];
    }

    if (!Array.isArray(dewormings)) {
      return ['Dewormings must be an array'];
    }

    return [
      undefined!,
      new CreatePetDto(
        owner,
        name,
        specie,
        breed,
        gender,
        isNeutered,
        new Date(birthDate),
        color,
        status,
        vaccinations,
        dewormings,
        photo,
        micro_chip_id,
      ),
    ];
  }
}
