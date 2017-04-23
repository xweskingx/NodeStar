import tensorflow as tf
from functools import wraps

def lazy_prop(function):
    attribute = '_loaded_' + function.__name__

    @property
    @wraps(function)
    def dec(self):
        with tf.variable_scope(function.__name__):
            if not hasattr(self, attribute):
                setattr(self, attribute, function(self))
            return getattr(self, attribute)

    return dec
