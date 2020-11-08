<?php
/**
 * Part of ci-phpunit-test
 *
 * @author     Kenji Suzuki <https://github.com/kenjis>
 * @license    MIT License
 * @copyright  2015 Kenji Suzuki
 * @link       https://github.com/kenjis/ci-phpunit-test
 */


class Pusher_test extends CIPHPUnitTestCase
{

    public function __construct()
    {
        parent::__construct();
    }

    public function setUp(): void
    {
        parent::setUpBeforeClass();

        $this->resetInstance();
    }

    public function getAuthJSON(string $authToken, string $socketId, string $channelName)
    {
        $key = '12398ade8605b8b69e1e';
        $secret = '2f556cef9a518268448c';

        $this->assertEquals("correct", "$authToken");
        $this->assertEquals('4353.3435:hellohello:{"authToken":"correct"}', "$socketId:$channelName:{\"authToken\":\"$authToken\"}");

        $presignedString = "$socketId:$channelName:{\"authToken\":\"$authToken\"}";

        $this->assertEquals('4353.3435:hellohello:{"authToken":"correct"}', $presignedString, "test");

        return hash_hmac("sha256", $secret, $presignedString);
    }

    public function test_auth_string()
    {
        $pusher_app_id = '1085843';
        $pusher_app_key = '12398ade8605b8b69e1e';
        $pusher_app_secret = '2f556cef9a518268448c';
        $pusher_debug = TRUE;
        $cluster = 'us2';
        $useTLS = true;

        echo ($pusher_app_id);

        $socketId = "4353.3435";
        $channelName = "hellohello";
        $authToken = "correct";

        $presignedString = "$socketId:$channelName:{\"authToken\":\"$authToken\"}";

        $json = $this->getAuthJSON($authToken, $socketId, $channelName);

        $this->assertEquals('4353.3435:hellohello:{"authToken":"correct"}', $presignedString, "attempt");
        $this->assertEquals('82b7e137398bcd5d23f9665296b1248bbabc0f58a9d6aeca60f611292ef0baf8', $json, "try");

        echo ($json);

    }
}
