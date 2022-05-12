package edu.stanford.bmir.protege.web.client.aboutoceans;

import com.google.gwt.core.client.GWT;
import com.google.gwt.uibinder.client.UiBinder;
import com.google.gwt.uibinder.client.UiField;
import com.google.gwt.user.client.ui.Composite;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HTMLPanel;
import edu.stanford.bmir.protege.web.resources.WebProtegeClientBundle;

/**
 * Author: Matthew Horridge<br>
 * Stanford University<br>
 * Bio-Medical Informatics Research Group<br>
 * Date: 22/08/2013
 */

public class AboutOceansBoxContent extends Composite {

    interface AboutOceansBoxContentUiBinder extends UiBinder<HTMLPanel, AboutOceansBoxContent> {

    }

    private static AboutOceansBoxContentUiBinder ourUiBinder = GWT.create(AboutOceansBoxContentUiBinder.class);

    @UiField
    protected HTML html;


    public AboutOceansBoxContent() {
        HTMLPanel rootElement = ourUiBinder.createAndBindUi(this);
        initWidget(rootElement);
        html.setHTML(WebProtegeClientBundle.BUNDLE.aboutOceansBoxText().getText());
    }
}
