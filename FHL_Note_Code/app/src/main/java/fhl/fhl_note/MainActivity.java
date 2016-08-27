package fhl.fhl_note;

import android.content.Context;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    protected WebView wv; // webView

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initialize();
    }

    // initialize
    protected void initialize(){
        // find webView
        wv = (WebView) findViewById(R.id.webview);
        // set up interface
        wv.addJavascriptInterface(new WebAppInterface(this), "Android");
        // enable javascript
        WebSettings webSettings = wv.getSettings();
        webSettings.setJavaScriptEnabled(true);
        // set up webViewClient
        wv.setWebViewClient(new WebViewClient());
        // connect to webpage
        connect();
    }

    // connect to web page
    protected void connect(){
        wv.loadUrl("http://10.0.2.2:8000/"); // test on localhost
    }

    // interface between app and javascript
    public class WebAppInterface {
        Context mContext;

        /** Instantiate the interface and set the context */
        WebAppInterface(Context c) {
            mContext = c;
        }

        /** Show a toast from the web page */
        @JavascriptInterface
        public void showToast(String toast) {
            Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
        }
    }
}
