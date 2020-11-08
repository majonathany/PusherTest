<?php
/**
 * Part of ci-phpunit-test
 *
 * @author     Kenji Suzuki <https://github.com/kenjis>
 * @license    MIT License
 * @copyright  2015 Kenji Suzuki
 * @link       https://github.com/kenjis/ci-phpunit-test
 */

class Welcome_test extends TestCase
{
    public function setUp(): void
    {
        $this->load->library('unit_test');
    }

	public function test_index()
	{
		$output = $this->request('GET', 'welcome/index');
		$this->assertContains('<title>Welcome to CodeIgniter</title>', $output);
	}

	public function test_method_404()
	{
		$this->request('GET', 'welcome/method_not_exist');
		$this->assertResponseCode(404);
	}

	public function test_APPPATH()
	{
		$actual = realpath(APPPATH);
		$expected = realpath(__DIR__ . '/../..');
		$this->assertEquals(
			$expected,
			$actual,
			'Your APPPATH seems to be wrong. Check your $application_folder in tests/Bootstrap.php'
		);
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

        $presignedString = "$socketId:$channelName:{\"authToken\": \"$authToken\" }";

        $server = new \Pusher_Server();
        $json = $server->getAuthJSON($authToken, $socketId, $channelName);
        $this->assertEquals($json, '82b7e137398bcd5d23f9665296b1248bbabc0f58a9d6aeca60f611292ef0baf8', "try", 'none');

        echo ($json);

    }
}
