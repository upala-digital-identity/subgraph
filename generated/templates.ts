// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  Address,
  DataSourceTemplate,
  DataSourceContext
} from "@graphprotocol/graph-ts";

export class BundledScoresPool extends DataSourceTemplate {
  static create(address: Address): void {
    DataSourceTemplate.create("BundledScoresPool", [address.toHex()]);
  }

  static createWithContext(address: Address, context: DataSourceContext): void {
    DataSourceTemplate.createWithContext(
      "BundledScoresPool",
      [address.toHex()],
      context
    );
  }
}

export class DappContract extends DataSourceTemplate {
  static create(address: Address): void {
    DataSourceTemplate.create("DappContract", [address.toHex()]);
  }

  static createWithContext(address: Address, context: DataSourceContext): void {
    DataSourceTemplate.createWithContext(
      "DappContract",
      [address.toHex()],
      context
    );
  }
}
