import { Address, EmergencyContact, Phone } from '../../';

export class UpdateOwnerDto {
  private constructor(
    public readonly id: string,
    public readonly fullName?: string,
    public readonly email?: string,
    public readonly phones?: Phone[],
    public readonly address?: Address,
    public readonly emergency_contact?: EmergencyContact,
  ) {}

  get values(): { [key: string]: any } {
    const returnObj: { [key: string]: any } = {};

    if (this.fullName) returnObj.fullName = this.fullName;
    if (this.email) returnObj.email = this.email;
    if (this.phones) returnObj.phones = this.phones;
    if (this.address) returnObj.address = this.address;
    if (this.emergency_contact)
      returnObj.emergency_contact = this.emergency_contact;

    return returnObj;
  }

  static create(obj: { [key: string]: any }): [string?, UpdateOwnerDto?] {
    if (!obj) return ['Missing payload'];
    const { id, _id, fullName, email, phones, address, emergency_contact } =
      obj;

    const finalId = _id || id;
    if (!finalId) return ['Missing owner ID'];

    if (phones !== undefined) {
      if (!Array.isArray(phones)) {
        return ['Should be at least one phone number'];
      }
    }

    const updatedData =
      fullName !== undefined ||
      email !== undefined ||
      phones !== undefined ||
      address !== undefined ||
      emergency_contact !== undefined;

    if (!updatedData) return ['No fields provider to update'];

    return [
      undefined!,
      new UpdateOwnerDto(
        finalId,
        fullName,
        email,
        phones,
        address,
        emergency_contact,
      ),
    ];
  }
}
