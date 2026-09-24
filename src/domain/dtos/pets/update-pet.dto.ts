import { Dewormings, Vaccinations } from '../..';

export class UpdatePetDto {
  private constructor(
    public readonly id: string,
    public readonly owner?: string,
    public readonly name?: string,
    public readonly specie?: string,
    public readonly breed?: string,
    public readonly gender?: string,
    public readonly is_neutered?: boolean,
    public readonly birth_date?: Date,
    public readonly color?: string,
    public readonly status?: boolean,
    public readonly vaccinations?: Vaccinations[],
    public readonly dewormings?: Dewormings[],
    public readonly photo?: string,
    public readonly micro_chip_id?: string,
  ) {}

  get values(): { [key: string]: any } {
    const returnObj: { [key: string]: any } = {};

    if (this.owner) returnObj.owner = this.owner;
    if (this.name) returnObj.name = this.name;
    if (this.specie) returnObj.specie = this.specie;
    if (this.breed) returnObj.breed = this.breed;
    if (this.gender) returnObj.gender = this.gender;
    if (this.is_neutered) returnObj.is_neutered = this.is_neutered;
    if (this.birth_date) returnObj.birth_date = this.birth_date;
    if (this.status) returnObj.status = this.status;
    if (this.vaccinations) returnObj.vaccinations = this.vaccinations;
    if (this.dewormings) returnObj.dewormings = this.dewormings;
    if (this.photo) returnObj.photo = this.photo;
    if (this.micro_chip_id) returnObj.micro_chip_id = this.micro_chip_id;

    return returnObj;
  }

  static create(obj: { [key: string]: any }): [string?, UpdatePetDto?] {
    if (!obj) return ['Missing payload'];

    const {
      _id,
      id,
      owner,
      name,
      specie,
      bredd,
      gender,
      is_neutered,
      bith_date,
      color,
      status,
      vaccinations,
      dewormings,
      photo,
      micro_chip_id,
    } = obj;

    const finalId = id || _id;
    if (!finalId) return ['Missing pet ID'];

    if (vaccinations !== undefined) {
      if (!Array.isArray(vaccinations)) {
        return ['Should be at least one vaccination'];
      }
    }

    if (dewormings !== undefined) {
      if (!Array.isArray(dewormings)) {
        return ['Should be at least one deworming'];
      }
    }

    return [
      undefined!,
      new UpdatePetDto(
        finalId,
        owner,
        name,
        specie,
        bredd,
        gender,
        is_neutered,
        bith_date,
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
