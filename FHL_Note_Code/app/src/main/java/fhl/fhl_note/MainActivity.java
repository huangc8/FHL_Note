package fhl.fhl_note;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.webkit.WebView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initialize();
    }

    // initialize
    protected void initialize(){
        WebView webview = new WebView(this);
        setContentView(webview);

        webview.loadUrl("http://a2z.fhl.net/bible/");
    }
}
