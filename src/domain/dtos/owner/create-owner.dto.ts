import { Address, EmergencyContact, Phone } from '../../';

export class CreateOwnerDto {
  private constructor(
    public readonly fullName: string,
    public readonly email: string,
    public readonly phones: Phone[],
    public readonly address: Address,
    public readonly emergency_contact: EmergencyContact,
  ) {}

  static create(obj: { [key: string]: any }): [string?, CreateOwnerDto?] {
    if (!obj) return ['Missing payload'];

    const { fullName, email, phones, address, emergency_contact } = obj;

    if (!fullName) return ['Missing full name'];
    if (!email) return ['Missing email'];
    if (!phones) return ['Missing phone(s)'];
    if (!address) return ['Missing address'];
    if (!emergency_contact) return ['Missing emerency contact'];
    if (phones !== undefined) {
      if (!Array.isArray(phones) || phones.length === 0) {
        return ['Should be at least one phone number'];
      }
    }

    return [
      undefined!,
      new CreateOwnerDto(fullName, email, phones, address, emergency_contact),
    ];
  }
}
