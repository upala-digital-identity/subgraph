// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class UpalaID extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("isExploded", Value.fromBoolean(false));
    this.set("owner", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save UpalaID entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save UpalaID entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("UpalaID", id.toString(), this);
    }
  }

  static load(id: string): UpalaID | null {
    return changetype<UpalaID | null>(store.get("UpalaID", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get isExploded(): boolean {
    let value = this.get("isExploded");
    return value!.toBoolean();
  }

  set isExploded(value: boolean) {
    this.set("isExploded", Value.fromBoolean(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get delegates(): Array<string> {
    let value = this.get("delegates");
    return value!.toStringArray();
  }

  set delegates(value: Array<string>) {
    this.set("delegates", Value.fromStringArray(value));
  }
}

export class Delegate extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("isOwner", Value.fromBoolean(false));
    this.set("isApproved", Value.fromBoolean(false));
    this.set("upalaID", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Delegate entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Delegate entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Delegate", id.toString(), this);
    }
  }

  static load(id: string): Delegate | null {
    return changetype<Delegate | null>(store.get("Delegate", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get isOwner(): boolean {
    let value = this.get("isOwner");
    return value!.toBoolean();
  }

  set isOwner(value: boolean) {
    this.set("isOwner", Value.fromBoolean(value));
  }

  get isApproved(): boolean {
    let value = this.get("isApproved");
    return value!.toBoolean();
  }

  set isApproved(value: boolean) {
    this.set("isApproved", Value.fromBoolean(value));
  }

  get upalaID(): string {
    let value = this.get("upalaID");
    return value!.toString();
  }

  set upalaID(value: string) {
    this.set("upalaID", Value.fromString(value));
  }
}

export class PoolFactory extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save PoolFactory entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save PoolFactory entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("PoolFactory", id.toString(), this);
    }
  }

  static load(id: string): PoolFactory | null {
    return changetype<PoolFactory | null>(store.get("PoolFactory", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get isApproved(): boolean {
    let value = this.get("isApproved");
    return value!.toBoolean();
  }

  set isApproved(value: boolean) {
    this.set("isApproved", Value.fromBoolean(value));
  }

  get pools(): Array<string> {
    let value = this.get("pools");
    return value!.toStringArray();
  }

  set pools(value: Array<string>) {
    this.set("pools", Value.fromStringArray(value));
  }
}

export class Pool extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("poolFactory", Value.fromString(""));
    this.set("owner", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Pool entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Pool entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Pool", id.toString(), this);
    }
  }

  static load(id: string): Pool | null {
    return changetype<Pool | null>(store.get("Pool", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get poolFactory(): string {
    let value = this.get("poolFactory");
    return value!.toString();
  }

  set poolFactory(value: string) {
    this.set("poolFactory", Value.fromString(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value!.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get baseScore(): BigInt | null {
    let value = this.get("baseScore");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set baseScore(value: BigInt | null) {
    if (!value) {
      this.unset("baseScore");
    } else {
      this.set("baseScore", Value.fromBigInt(<BigInt>value));
    }
  }

  get metadata(): string | null {
    let value = this.get("metadata");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set metadata(value: string | null) {
    if (!value) {
      this.unset("metadata");
    } else {
      this.set("metadata", Value.fromString(<string>value));
    }
  }

  get scoreBundles(): Array<string> {
    let value = this.get("scoreBundles");
    return value!.toStringArray();
  }

  set scoreBundles(value: Array<string>) {
    this.set("scoreBundles", Value.fromStringArray(value));
  }
}

export class ScoreBundle extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("timestamp", Value.fromBigInt(BigInt.zero()));
    this.set("isDeleted", Value.fromBoolean(false));
    this.set("pool", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ScoreBundle entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save ScoreBundle entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("ScoreBundle", id.toString(), this);
    }
  }

  static load(id: string): ScoreBundle | null {
    return changetype<ScoreBundle | null>(store.get("ScoreBundle", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get isDeleted(): boolean {
    let value = this.get("isDeleted");
    return value!.toBoolean();
  }

  set isDeleted(value: boolean) {
    this.set("isDeleted", Value.fromBoolean(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }
}

export class UpalaSettings extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("attackWindow", Value.fromBigInt(BigInt.zero()));
    this.set("executionWindow", Value.fromBigInt(BigInt.zero()));
    this.set("explosionFeePercent", Value.fromI32(0));
    this.set("treasury", Value.fromBytes(Bytes.empty()));
    this.set("owner", Value.fromBytes(Bytes.empty()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save UpalaSettings entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save UpalaSettings entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("UpalaSettings", id.toString(), this);
    }
  }

  static load(id: string): UpalaSettings | null {
    return changetype<UpalaSettings | null>(store.get("UpalaSettings", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get attackWindow(): BigInt {
    let value = this.get("attackWindow");
    return value!.toBigInt();
  }

  set attackWindow(value: BigInt) {
    this.set("attackWindow", Value.fromBigInt(value));
  }

  get executionWindow(): BigInt {
    let value = this.get("executionWindow");
    return value!.toBigInt();
  }

  set executionWindow(value: BigInt) {
    this.set("executionWindow", Value.fromBigInt(value));
  }

  get explosionFeePercent(): i32 {
    let value = this.get("explosionFeePercent");
    return value!.toI32();
  }

  set explosionFeePercent(value: i32) {
    this.set("explosionFeePercent", Value.fromI32(value));
  }

  get treasury(): Bytes {
    let value = this.get("treasury");
    return value!.toBytes();
  }

  set treasury(value: Bytes) {
    this.set("treasury", Value.fromBytes(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value!.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }
}

export class DApp extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("isRegistered", Value.fromBoolean(false));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save DApp entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save DApp entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("DApp", id.toString(), this);
    }
  }

  static load(id: string): DApp | null {
    return changetype<DApp | null>(store.get("DApp", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get isRegistered(): boolean {
    let value = this.get("isRegistered");
    return value!.toBoolean();
  }

  set isRegistered(value: boolean) {
    this.set("isRegistered", Value.fromBoolean(value));
  }

  get approvedPools(): Array<string> | null {
    let value = this.get("approvedPools");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set approvedPools(value: Array<string> | null) {
    if (!value) {
      this.unset("approvedPools");
    } else {
      this.set("approvedPools", Value.fromStringArray(<Array<string>>value));
    }
  }
}
