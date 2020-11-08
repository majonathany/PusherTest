import "core-js/stable";
import { test } from "@jest/globals";
import { screamifyCamel, camelifyScreaming } from "../pusher_client/helpers";
//camelCaseToScreamingSnakeCase
test("t1", function () {
    expect(screamifyCamel("camelCase")).toBe("CAMEL_CASE");
});
test("t2", function () {
    expect(screamifyCamel("SRelaysCanKickOutOtherC")).toBe("S_RELAYS_CAN_KICK_OUT_OTHER_C");
});
test("t3", function () {
    expect(screamifyCamel("helloHello1Hello")).toBe("HELLO_HELLO1_HELLO");
});
//ScreamingSnakeCaseToCamelCase
test("t4", function () {
    expect(camelifyScreaming("FETCH_STAFF_ID")).toBe("fetchStaffId");
});
test("t5", function () {
    expect(camelifyScreaming("FETCH_PROJ_TEMP_VER_ID")).toBe("fetchProjTempVerId");
});
test("t6", function () {
    expect(camelifyScreaming("HELLO_HELLO1_HELLO")).toBe("helloHello1Hello");
});
