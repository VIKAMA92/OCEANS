package edu.stanford.bmir.protege.web.client.d3;

import elemental.dom.Element;
import elemental.dom.Node;
import jsinterop.annotations.JsMethod;
import jsinterop.annotations.JsPackage;
import jsinterop.annotations.JsProperty;
import jsinterop.annotations.JsType;

import javax.annotation.Nonnull;

import edu.stanford.bmir.protege.web.client.graphlib.EdgeDetails;
import edu.stanford.bmir.protege.web.client.graphlib.NodeDetails;

import java.util.*;
import java.util.stream.Stream;

@JsType(isNative = true, namespace = JsPackage.GLOBAL, name = "layout")
public class Layout {

    @JsMethod(name = "generateGraph")
    @Nonnull
    public static native void generateGraph(Object[] nodes,  Object[] links, int width, int height);
    
}

